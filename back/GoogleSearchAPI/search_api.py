from dotenv import load_dotenv
from serpapi import GoogleSearch
import os

load_dotenv()
api_key = os.getenv("SEARCH_API_KEY")

from PrismaAPI import prisma_service
prisma = prisma_service.db

def search(search_text):
    params = {
        "q": search_text,
        "hl": "pt",
        "gl": "br",
        "google_domain": "google.com",
        "api_key": api_key,
        "safe": "active"
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    organic_results = results["organic_results"]
    return organic_results

def recycle(search_object):
    prisma.connect()
    prisma.searchs.create(
        data = search_object
    )
    prisma.disconnect()
