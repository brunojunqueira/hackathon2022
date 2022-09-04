import PyPDF2
import json
import dotenv
import os

pdf_path = os.path.dirname(os.path.realpath(__file__)) +  "/../Public/resources/PDF"
json_path = os.path.dirname(os.path.realpath(__file__)) + "/../Public/resources/JSONFiles/output.json"

#Loads Json File
def load_json(json_path=json_path) -> dict:
    count = 0
    while count <= 4:
        try:
            with open(json_path,"r",encoding="utf-8")as json_file:
                data = json.load(json_file)
            return data
        except:
            with open(json_path,"w",encoding="utf-8")as json_file:
                json.dump({},json_file,indent=4)

    print("Verify your json file")

#Return the pdf path
def get_pdfpath(dict_key,pdf_path=pdf_path) -> str:
    files = os.listdir(pdf_path)

    for file in files:
        if dict_key == file[:file.find(".pdf")]:
            path = pdf_path + "//" + file
            return path
    
    return None

#Save dictionary as JSON
def save_json(dictionary,json_path=json_path):
    with open(json_path, "r") as json_file:
        new_dict = json.load(json_file)
        for key_a in new_dict.keys():
            for key_b in dictionary.keys():
                print(f"Key_a {key_a} Key_b {key_b}")
                if key_a == key_b:
                    print("This file is already converted")
                    return         

    with open(json_path, "w",encoding="utf-8") as json_file:            
        new_dict.update(dictionary)
        json.dump(new_dict, json_file, indent=4)                    

#Load the pdf and return a dict of dicts
def load_pdf(file_name, pdf_path=pdf_path) -> dict: 
    pdfreader= PyPDF2.PdfFileReader(pdf_path+"/"+file_name)
    numpages = pdfreader.numPages
    
    dicts = {}
    key_name = file_name[:file_name.find(".pdf")] 
    dicts[key_name] = {}
       
    for page in range(numpages):
        
        page_number = "PAGE " + str(page+1)
        dicts[key_name][page_number] = str(pdfreader.pages[page].extract_text())    
    return dicts  


def search_and_getpdf(key_word,pdf_path=pdf_path) -> list:
    pages_matched = search_keyword(key_word)
    pdf_paths = {}
    pass
    
#Searchs a keyword in json_file
def search_keyword(key_word,json_path=json_path) -> dict:
    
    pages_match = {}

    with open(json_path,"r") as json_file:
        data = json.load(json_file)
        
        for dict_key in data:
            page_list = []
            for key in data[dict_key].keys():                    
                if str(data[dict_key][key]).lower().find(key_word.lower()) != -1:                               
                    page_list.append(key)

            if len(page_list) != 0:            
                pages_match[dict_key] = page_list
           
    return pages_match

def load_manypdf(pdf_path=pdf_path):
    files = os.listdir(pdf_path)
    pdf_files = []
    not_duplicated_files = []
    not_duplicated = True
    json_dict = load_json()  

    for file in files:
        if file.find(".pdf") != -1:
            pdf_files.append(file)
    
    for pdf_file in pdf_files:
        for key in json_dict.keys():
            if key == pdf_file[:pdf_file.find(".pdf")]:
                not_duplicated = False
        if not_duplicated:
            not_duplicated_files.append(pdf_file)
    
    if  len(not_duplicated_files) > 0:
        for file in not_duplicated_files:            
            save_json(load_pdf(file))                

    
load_manypdf()
