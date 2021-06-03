/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
const { Op, Sequelize } = require('sequelize');
// FUNCIONES AUXILIARES DE SEQUELIZE

/**
 * Busca la coincidencias dentro de un rango ve valores
 * @param {*} min es de tipo integer y es el minimo valor de busqueda
 * @param {*} max es de tipo integer y es el maximo valor de busqueda
 * @returns Un objeto de busqueda: [Op.gte]: (>=) o [Op.lte]: (<=)
 */
function buildMinMax(min, max) {
  // eslint-disable-next-line no-shadow
  const query = [];
  // { [Op.and]: [{},{},{}] }
  if (min) query.push({ [Sequelize.Op.gte]: min });
  if (max) query.push({ [Sequelize.Op.lte]: max });
  return { [Sequelize.Op.and]: query };
}

/**
   * Busca una las coincidencias (case insensitive) de una palabra (word) en un string
   * @param {*} word es de tipo string
   * @returns Un objeto de busqueda: [Op.iLike]:
   */
function buildIlike(word) {
  return { [Op.iLike]: `%${word}%` };
}

/**
   * Busca el valor exacto
   * @param {*} number  es de tipo integer
   * @returns Un objeto de busqueda: [Op.eq]:
   */
function buildEqual(number) {
  return { [Op.eq]: number };
}

/**
   * Construye una sentencia where en conjunto con varios and
   * @param {*} block block es un objeto con los atributos que se van a usar para los filtros
   * @returns Las condiciones de busqueda: where atributo1 and atributo2 and ...
   */
function buidlWhere(block) {
  // eslint-disable-next-line no-shadow
  const query = [];
  if (block.post_name) query.push({ post_name: buildIlike(block.post_name) });
  if (block.city) query.push({ city: buildIlike(block.city) });
  if (block.neighborhood) query.push({ neighborhood: buildIlike(block.neighborhood) });
  query.push({ price: buildMinMax(block.priceMin, block.priceMax) });
  query.push({ m2: buildMinMax(block.areaMin, block.areaMax) });
  query.push({ rooms: buildMinMax(block.rooms, null) });
  query.push({ bathrooms: buildMinMax(block.bathrooms, null) });
  if (block.stratum) query.push({ stratum: buildEqual(block.stratum) });
  if (block.years) query.push({ years: buildEqual(block.years) });
  if (block.prop_type) query.push({ prop_type: buildIlike(block.prop_type) });
  if (block.pool) query.push({ pool: buildEqual(block.pool) });
  if (block.backyard) query.push({ backyard: buildEqual(block.backyard) });
  if (block.gym) query.push({ gym: buildEqual(block.gym) });
  if (block.bbq) query.push({ bbq: buildEqual(block.bbq) });
  if (block.parking_lot) query.push({ parking_lot: buildEqual(block.parking_lot) });
  if (block.elevator) query.push({ elevator: buildEqual(block.elevator) });
  if (block.security) query.push({ security: buildEqual(block.security) });
  if (block.garden) query.push({ garden: buildEqual(block.garden) });
  if (block.status) query.push({ status: buildEqual(block.status) });
  if (block.active) query.push({ active: buildEqual(block.active) });
  return { [Sequelize.Op.and]: query };
}
/**
   * Construye una sentencia where en conjunto con varios and
   * @param {*} block block es un objeto con los atributos que se van a usar para los filtros
   * @returns Las condiciones de busqueda: where atributo1 and atributo2 and ...
   */
function buidlWhereUser(block) {
  // eslint-disable-next-line no-shadow
  const query = [];
  if (block.email) query.push({ email: buildIlike(block.email) });
  if (block.name) query.push({ name: buildIlike(block.name) });
  if (block.city) query.push({ city: buildIlike(block.city) });
  if (block.phone) query.push({ phone: buildEqual(block.phone) });// integer
  if (block.photo) query.push({ photo: buildIlike(block.photo) });
  if (block.password) query.push({ password: buildIlike(block.password) });
  if (block.street_number) query.push({ street_number: buildIlike(block.street_number) });
  if (block.zip_code) query.push({ zip_code: buildIlike(block.zip_code) });
  if (block.type) query.push({ type: buildIlike(block.type) });
  return { [Sequelize.Op.and]: query };
}

/**
 * Busca todos los valores del array
 * @param {*} array tiene todos los elementos que son buscados
 * @returns Un objeto de busqueda: [Sequelize.Op.in]:
 */
function buildFindByArray(array) {
  return { [Sequelize.Op.in]: array };
}
// FUNCIONES AUXILIARES PARA EL PAGINADO
/**
 * Obtiene el numero de la pagina actual con respecto al offset y al limit
 * @param {*} offset es de tipo integer y es desde donde empiezo a traer los datos
 * @param {*} limit es de tipo integer y es la cantidad de registros que devuelvo
 * @returns Un integer
 */
function getCurrentPage(offset, limit) {
  return (offset + limit) / limit;
}

function isRegEx(id) {
  const regex = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  return regex.test(id);
}

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// /**
//  *
//  * @param {*} texto es un string
//  * @returns retorna un string sin tildes
//  */
// function changeDiacriticos(texto) {
//   return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// }

module.exports = {
  buidlWhere,
  buildEqual,
  buildIlike,
  buildMinMax,
  getCurrentPage,
  buidlWhereUser,
  isRegEx,
  buildFindByArray,
  getRandomInt,
};
