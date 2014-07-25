files-from-path
===============

Generate a popup contains items with file/folder name

####Plained fixes:####

* Folder with spaces are not work (display only first word). 
* When you trying to press enter to insert path - after path creates tab or 4 spaces. (not checked on another PC, maybe useronly bug)

Build history:

* 10000 - first release
* 10001 - fix for "if folder is empty - tooltip will be generated but without any items."
* 10002 - fix for "in some times path cut not correctly. (math error)"
* 10010 - add method to remove all characters after last "/" in path string (e.g. if in folder `/var/www/` exists folder "coolfolder" and you type `/var/www/cool` - tooltip will not be generated, but after build 10010 "cool" will be removed and tooltip will be generated)
