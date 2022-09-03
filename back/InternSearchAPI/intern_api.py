from PrismaAPI import prisma_service

prisma = prisma_service.db

def search(search_text):
	keys = search_text.lower()
	prisma.connect()
	formated_keys = [{'keywords': {'has': keys}}]
	splited_keys = keys.split(" ")

	for key in splited_keys:
		formated_keys.append({'keywords': {'has': key}})
	
	search_results = prisma.searchs.find_many(
		where={ 
			'OR': formated_keys
		}
	)

	results = []
	for result in search_results:
		results.append({
			'title': result.title,
			'snippet': result.snippet,
			'link': result.link,
			'keywords': result.keywords
		})

	prisma.disconnect()
	return results


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