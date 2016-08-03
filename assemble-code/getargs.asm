
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

org 100h

mov si, 81h
cmp [si], 20h
jne main_loop
inc si
main_loop:
mov dl, [si]
cmp dl, 13
jz exit
mov ah, 2
int 21h
inc si
jmp main_loop
exit:
ret
