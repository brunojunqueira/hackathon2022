from PrismaAPI import prisma_service
from flask import url_for

prisma = prisma_service.db

def search(keys):
	prisma.connect()
	formated_keys = []
	splited_keys = keys.split(" ")
	
	for key in splited_keys:
		formated_keys.append({'keywords': {'has': key}})
		
	search_results = prisma.users.find_many(
		where={ 
			'OR': formated_keys
		}
	)
	
	results = []
	for result in search_results:
		results.append({
			'avatar_url': result.avatar_url,
			'name': result.name,
			'role': result.role,
			'email': result.email,
			"phone": result.phone,
			'keywords': result.keywords
		})
	prisma.disconnect()
	return results

def teste():
	prisma.connect()
	valores = [
		{
			"avatar_url":"http://localhost:5000/avatars/user_0.jpeg",
			"name":"João Guilherme",
			"role":"Gerente de Sistemas",
			"email": "joao@gmail.com",
			"phone":"21 9 8319-1938",
			"keywords": ["sistema","comunicação","rede"]
		},
		{
			"avatar_url":"http://localhost:5000/avatars/user_1.jpeg",
			"name":"Pedro Marsel",
			"role":"Técnico em Metalurgia",
			"email": "pedro@gmail.com",
			"phone":"21 9 8349-1458",
			"keywords": ["metalúrgica","válvula","solda","metalurgia"]
		},{
			"avatar_url":"http://localhost:5000/avatars/user_2.jpeg",
			"name":"Ramon Oliveira",
			"role":"Engenheiro Mecânico",
			"email": "ramon@gmail.com",
			"phone":"21 9 8147-4145",
			"keywords": ["motor","pistão"]
		},{
			"avatar_url":"http://localhost:5000/avatars/user_3.jpeg",
			"name":"Elisa Pietra",
			"role":"Desenvolvedor Full-Stack",
			"email": "elisa@gmail.com",
			"phone":"21 9 8529-1952",
			"keywords": ["desenvolvimento","back","front","web","aplicação"]
		},{
			"avatar_url":"http://localhost:5000/avatars/user_4.jpeg",
			"name":"Fellipe Azevedo",
			"role":"Administrador",
			"email": "joao@gmail.com",
			"phone":"21 9 8749-7485",
			"keywords": ["administração","gerência","cálculo", "contagem", "planilha"]
		},{
			"avatar_url":"http://localhost:5000/avatars/user_5.jpeg",
			"name":"Mateus Santos",
			"role":"Engenheiro Petrolífero",
			"email": "joao@gmail.com",
			"phone":"21 9 8319-1938",
			"keywords": ["óleo","petróleo","engenheiro","geologia","extração","mineração"]
		}
	]
	prisma.users.create_many(
		data = valores,
		skip_duplicates = True
	)
	prisma.disconnect()