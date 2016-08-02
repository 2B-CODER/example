org 100h

cld
mov cx, 12
mov si, offset source
mov di, offset destination
rep movsb
mov ax, 4c00h
int 21h
source      db "aaabbbcccddd"
destination db 12 dup(0)
