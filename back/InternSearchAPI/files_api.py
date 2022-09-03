import PyPDF2
import json
import dotenv

def save_json(dictionary,json_path):

    with open(json_path, "r") as json_file:
        new_dict = json.load(json_file)
        for key_a in new_dict.keys():
            for key_b in dictionary.keys():
                print(f"Key_a {key_a} Key_b {key_b}")
                if key_a == key_b:
                    print("This file is already converted")
                    return         

    with open(json_path, "w") as json_file:            
        new_dict.update(dictionary)
        json.dump(new_dict, json_file, indent=4)                    

def load_pdf(file_name) -> dict: 
    pdfreader= PyPDF2.PdfFileReader(file_name)
    numpages = pdfreader.numPages
    
    dicts = {}
    dicts[file_name] = {}

    with open("output.txt",'w',encoding="utf-8") as f:   
        for page in range(numpages):
            
            page_number = "PAGE " + str(page+1)
            dicts[file_name][page_number] = str(pdfreader.pages[page].extract_text())
    
    return dicts  

def search_keyword(json_path, key_word) -> dict:
    
    pages_match = {}

    with open(json_path,"r") as json_file:
        data = json.load(json_file)
        
        for dict_key in data:
            page_list = []
            for key in data[dict_key].keys():                    
                if str(data[dict_key][key]).lower().find(key_word.lower()) != -1:                               
                    page_list.append(key)

            print(f"\n\nKEY DO DICIONARIO --> {dict_key}")
            pages_match[dict_key] = page_list
           
    return pages_match
