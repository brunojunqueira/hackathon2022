from prisma import Prisma

db = Prisma()

def init() -> None:
    db.connect()