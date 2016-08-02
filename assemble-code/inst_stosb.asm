org 100h

cld
mov cx, 12
mov al, "A"
mov di, offset destination
rep stosb
mov ax, 4c00h
int 21h
destination db 12 dup(0)
