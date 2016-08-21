
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

org 100h

; nops:
    db 90h, 8dh, 9fh, 0, 0 ; 5-byte nops
init:    
    mov cx, 12
decr:
    push cx
    mov cx, 4
    mov di, 103h
    std
l12:
    mov ah, 11
    int 21h
    test al, al
    jz padd
    mov ah, 7
    int 21h
    stosb
    loop l12
    push 0
    jmp l13
padd:
    mov al, 0
    mov [104h], -1 ; 104h
    push cx
    rep stosb
l13:
    inc di
    mov bp, 4
    call call1
    call call1
    lea bp, dest
    lea si, lkup
    mov cx, 85
    mov dx, [di+2]
    mov ax, [di]
    div cx
    mov bx, dx
    mov bl, [bx+si]
    mov [bp+2], bl
    div cl
    mov bx, si ; mov bx, lkup
    xlat
    mov [bp+1], al
    mov al, ah
    xlat
    mov [bp], al    
    pop bx
    mov cl, xlatt[bx] ; ¿˚”√ CH = 0 
    lea si, dest
    cld
    test cl, cl
    jz endpr
    mov ah, 2
outl:
    lodsb
    mov dl, al
    int 21h
    loop outl
    cmp b.[di+4], 0
    jnz endpr
    pop cx    
    ; dec cx
    loop decr
    mov ah, 2
    mov dl, 13
    int 21h
    mov dl, 10
    int 21h
    jmp init
call1:
    mov si, 85
    xor dx, dx
    mov ax, [di+2]
    div si
    push ax
    mov ax, [di]
    div si
    ; push si
    mov si, dx
    mov dl, lkup[si]
    mov dest[bp], dl
    ; pop si
    dec bp
    mov [di], ax
    pop ax
    mov [di+2], ax
    ret
    
lkup db "#$'()*+,-./0123456789:;=",63,"@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]_`abcdefghijklmnopqrstuvwxyz{}"
dest db "     "
xlatt db 5,4,3,2,0

endpr:
    mov ah, 2
    mov dl, "~"
    int 21h
    mov ax, 4c00h
    int 21h