import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const Grade = db.grade;

const create = async (req, res) => {
  try {
    const grade = new Grade({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
    });

    //Criando registros
    const data = await grade.save();

    res.status(200).send(`${data.id} criado!`);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const data = await Grade.find(condition);
    res.status(200).send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findOne({ _id: id });
    res.status(200).send(data);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Sem dados para atualizacao!",
    });
  }

  const id = req.params.id;

  try {
    await Grade.findByIdAndUpdate(id, req.body);
    res.status(200).send({ message: "Grade atualizado com sucesso" });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndDelete(id);

    if (!data)
      res.status(200).send("Grade não encontrada. Verifique os parâmetros!");
    res.status(200).send({ message: `Grade excluido com sucesso: ${data}` });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_req, res) => {
  try {
    const data = await Grade.deleteMany({});
    res.send({
      message: `Removidos: ${data}`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
