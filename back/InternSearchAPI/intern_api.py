from PrismaAPI import prisma_service
#from back.GoogleSearchAPI.search_api import search

prisma = prisma_service.db

def search(keys):
	prisma.connect()
	formated_keys = []
	splited_keys = keys.split(" ")

	for key in splited_keys:
		formated_keys.append({'keywords': {'contains': key}})
	

	search_result = prisma.searchs.find_many(
		where={ 
				'OR': formated_keys
		}
	)
	prisma.disconnect()
	return search_result


def teste():
	prisma.connect()
	valores = [
		{
			"title":"Valvula termoestatica de rapida liberacao",
			"snippet":"Libera o liquido apos passar de 90ºC",
			"link":"internal_database",
			"keywords": ["valvula" ,"termoestatica"]
		},
		{
			"title":"Erro 09 Máquina 1", 
			"snippet":"Verifique a placa controladora de fluidos contina do compartimento A",
			"link":"internal_database",
			"keywords": ["valvula", "termoestatica"]
		},
		{
			"title":"Erro 650 Máquina 2", 
			"snippet":"Verifique a válvula 10 se esta na posição C", 
			"link":"https://www.prisma.io/docs/", 
			"keywords": ["Maquina","02"]
		},
		{
			"title":"Vazamento elevado pipe 09",
			"snippet":"Desative o sistema e verifique a isolação", 
			"link":"https://www.prisma.io/docs/",
			"keywords": ["Erro", "09", "pipe"]
		},
		{
			"title":"Alta temperatura de combustão",
			"snippet":"Aumente a taxa de vazão de agua para 200L",
			"link":"https://www.prisma.io/docs/",
			"keywords": ["temperatura","elevada"]
		}
	]
	prisma.searchs.create_many(
			data = valores,
			skip_duplicates = True
	)
	prisma.disconnect()