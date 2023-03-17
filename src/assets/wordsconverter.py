

import codecs
import json


def loadList():
    words = {}
    with open('/Users/flavio.mendes/Documents/Pers/alkey/src/assets/words.txt') as f:
        lines = f.readlines()
        
        
        for line in lines:
            line = line.replace("\n", "") 
            if not line.endswith("ai") and not line.endswith("areis") and not line.endswith("arias") and not line.endswith("areis") and not line.endswith("arei") and not line.endswith("asseis") and not line.endswith("ieis")  and not line.endswith("rias")  and not line.endswith("eavas")  and not line.endswith("astes"):
                words[line] = 0
                
            
    with codecs.open("words.json", "w", "utf-8") as temp:
        temp.write(json.dumps(words, indent = 4, ensure_ascii=False ) )
        temp.close()


loadList()

