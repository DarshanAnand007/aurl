rm assets -rf
mv -f bss/* . 
rm backdoor-1.html  component.html 
rename 's/html/ejs/' *
sed -i 's/&lt;/</g' *.ejs
sed -i 's/&gt;/>/g' *.ejs
sed -i 's/assets/\/assets/g' *.ejs
rm -rf ../views/*
mv -f *.ejs ../views/
