from PrismaAPI import prisma_service

prisma = prisma_service.db

def search(keys):
    prisma.connect()
    formated_keys = []

    splited_keys = keys.split(" ")

    for key in splited_keys:
        formated_keys.append({'keywords': {'contains': key}})

    search_result = prisma.users.find_many(
        where={ 
            'OR': formated_keys
        }
    )
    prisma.disconnect()
    return search_result