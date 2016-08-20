
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

org 100h

initial:
pushf

lea di, $src
mov cx, 5
mov ah, 7
cld
inpl:
    int 21h
    cmp al, 33
    jb inpl
    cmp al, 126
    je $pret
    stosb
loop inpl

push 4

inpj1:

lea si, $tab
lea di, $dest
mov cx, 85

xor ax, ax
xor bx, bx

; nop ; 1st

mov bl, si[-5]
mov al, si[bx]

; nop ; 2nd

mul cl 
mov bl, si[-4]
mov bl, si[bx]
add ax, bx

; nop ; 3rd

mul cx
mov bl, si[-3]
mov bl, si[bx]
add ax, bx
adc dx, 0

; nop ; 4th

push bp
mov bx, -2
call sc1
call sc1
pop bp 
mov $dest[0], ax
mov $dest[2], dx
add di, 3 
std 
mov ah, 2
pop cx
mov si, di
test cx, cx
je terminate
repp:
    lodsb
    mov dl, al
    int 21h
loop repp

jmp next

sc1 proc
    push bx
    mov bl, si[bx]
    xor bh, bh
    mov bl, si[bx]
    mov bp, ax
    mov ax, dx
    mul cx
    push ax
    mov ax, bp
    mul cx 
    pop bp
    add ax, bx
    adc dx, bp
    pop bx
    inc bx
    ret
sc1 endp

$pret proc
    mov bx, cx
    xor dx, dx
    mov dl, $chrs[bx]
    push dx
    rep stosb
    mov $endvar, -1
    jmp inpj1
$pret endp

$src db 5 dup(0)

$tab db 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
     db 1,0,0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,0,23,0,24
     db 25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48
     db 49,50,51,52,53,54,0,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71
     db 72,73,74,75,76,77,78,79,80,81,82,83,0,84,84,0

$chrs db 4,3,2,1,0,0

$dest dw 0,0

$endvar dw 0

next:
mov ax, $endvar[0]
test ax, ax
jz initial ; reinitialize
terminate:
popf
mov ax, 4c00h
int 21h
