const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = require("../models");
require("dotenv").config();

// exports.login = async (req, res) => {
module.exports = {
	signup: (req, res) => {
		if (req.method === "POST") {
			const email = req.body.email;
			const password = req.body.password;
			const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

			const isEmptyEmail = !email ? false : true;

			switch (isEmptyEmail) {
				case false:
					return res
						.status(206)
						.json({ erreur: "Veuillez renseigner une adresse mail" });
					break;
				case true:
					const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
					const validRegex = regexEmail.test(email) ? true : false;
					if (validRegex) {
						const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
						const isEmptyPassword = !password ? false : true;
						const isRegexPassword = regexPassword.test(password) ? true : false;
						if (isEmptyPassword && isRegexPassword) {
							models.Admin.findOne({
								attributes: ["email"],
								where: { email: email },
							})
								.then((adminFound) => {
									if (!adminFound) {
										bcrypt.hash(password, 10, (err, hash) => {
											var newAdmin = models.Admin.create({
												email: email,
												password: hash,
											})
												.then((newAdmin) => {
													return res.status(201).json({
														adminId: newAdmin.id,
													});
												})
												.catch((err) => {
													return res.status(500).json({
														erreur: "Impossible d'ajouter un administrateur.",
													});
												});
										});
									} else {
										return res
											.status(409)
											.json({ erreur: "Cette adresse est déjà utilisée." });
									}
								})
								.catch((err) => {
									return res
										.status(500)
										.json({ erreur: "Une erreur est survenue." });
								});
						} else {
							return res
								.status(409)
								.json({ erreur: "Veuillez taper votre mot de passe." });
						}
					} else {
						return res
							.status(409)
							.json({ erreur: "Veuillez taper une adresse e-mail valide" });
					}
					break;
				default:
					return res.status(404).json({
						erreur: "Un problème est survenue, veuillez réessayer plus tard.",
					});
			}
		}
	},
	login: (req, res) => {
		if (req.method === "POST") {
			const email = req.body.email;
			const password = req.body.password;

			const isEmptyEmail = email ? true : false;

			switch (isEmptyEmail) {
				case false:
					return res
						.status(206)
						.json({ erreur: "Veuillez renseigner une adresse mail" });
					break;
				case true:
					const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
					const validRegex = regexEmail.test(email) ? true : false;
					if (validRegex) {
						const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
						const isEmptyPassword = password ? true : false;
						const isRegexPassword = regexPassword.test(password) ? true : false;
						if (isEmptyPassword && isRegexPassword) {
							models.Admin.findOne({
								where: { email: email },
							})
								.then((adminFind) => {
									if (adminFind) {
										let hash = bcrypt.compareSync(password, adminFind.password);
										if (hash) {
											return res.status(200).json({
												token: jwt.sign(
													{
														ID: adminFind.id,
														email: adminFind.email,
													},
													process.env.SECRET_TOKEN,
													{ expiresIn: "2h" }
												),
											});
										} else {
											return res.status(500).json({
												erreur: "Votre mot de passe est incorrect.",
											});
										}
									} else {
										return res.status(404).json({
											erreur:
												"Cet administrateur n'exsite pas dans la base de donnée.",
										});
									}
								})
								.catch(() => {
									return res.status(500).json({
										erreur:
											"Impossible de vous connecter en tant qu'administrateur.",
									});
								});
						} else {
							return res.status(409).json({
								erreur:
									"Votre mot de passe est vide ou ne respecte pas les critère d'un mot de passe",
							});
						}
					} else {
						return res
							.status(409)
							.json({ erreur: "Veuillez taper une adresse e-mail valide" });
					}
					break;
				default:
					return res.status(404).json({
						erreur: "Un problème est survenue, veuillez réessayer plus tard.",
					});
			}
		}
	},
};
