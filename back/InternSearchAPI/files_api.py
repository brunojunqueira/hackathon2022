import PyPDF2
import json
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
            path = "http://192.168.1.2:5000/resources/PDF/" + file
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

#Pick-up the first ocurrence of the key word in a pdf page
def get_snippet(main_dict_key, page_key,key_word) -> str:
    def get_start_index(page_string,key_word_index) -> int:
        break_occurrences = []
        iterations = 0

        while True:
            break_occurrences.append(page_string.find("\n"))
            if break_occurrences[len(break_occurrences)-1] > key_word_index and iterations == 0:
                return key_word_index
            elif iterations >= len(page_string):
                return key_word_index
            elif break_occurrences[len(break_occurrences)] > key_word_index:
                return break_occurrences[len(break_occurrences)-1]

            iterations += 1

        
    def get_end_index() -> int:
        pass

    #Load Json with all pages
    all_dicts = load_json() 
    #print(all_dicts[main_dict_key][page_key])

    page_string = all_dicts[main_dict_key][page_key]
    index = page_string.find(key_word)         
        
    snippet = page_string[get_start_index(page_string,index):]
    print(snippet)


#Return formated data to front-end
def get_all_data(key_word,pdf_path=pdf_path) -> list:
    def key_to_str(key):
        return str(key)[str(key).find(" ")+1:]
    
    output_dicts = []
    files_matched = search_keyword(key_word)

    if not bool(files_matched):return None
    print(files_matched.keys())
    for key in files_matched.keys():        
        file_path = get_pdfpath(key)
        print(f"Key: {files_matched[key][0]}")
        #get_snippet(key,files_matched[key][0],key_word)       
        
        page_number = list(map(key_to_str, files_matched[key]))        
        temp_dict = dict(title = key,keywords = key_word,link = file_path,ocurrences=page_number)
        output_dicts.append(temp_dict)

    return output_dicts
   
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

#Lite loader for more than one pdf file
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
print(get_all_data("ssl"))
