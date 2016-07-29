; multi-segment executable file template.

xdata segment
    sptr  dw  0
    mulc  dw  0
ends    
    
sseg segment stack ; data segment for stack
    dw   128  dup(0)
ends

; dseg1 segment
    ; data
; ends

cseg segment
start:
; set segment registers:
    ; mov ax, dseg1
    mov ax, ss
    mov ds, ax
    mov es, ax
    
    mov ax, 3
	int 10h
	mov ax, 1003h
    mov bx, 0
    int 10h
    mov ch, 32
    mov ah, 1
    int 10h
    
    mov ax, return
    push ax
    xor ax, ax
    push ax
    mov al, 4
     
    push bp
    mov bp, sp
    sub sp, ax
    sub bp, ax
    mov cx, 80*25
    
    d0:
    push ax
    mov ah, 7
    
    d1:
    int 21h
    cmp al, 13
    jz d1
    call subp1
    mov [bp+0], al
    
    d2:
    int 21h
    cmp al, 13
    jz d2
    call subp1
    mov [bp+1], al
    
    d3:
    int 21h
    cmp al, 13
    jz d3
    call subp1
    mov [bp+2], al
    
    pop ax
    
    push ds
    push es
    pusha
    
    mov ax, 0b800h
    mov bx, xdata
    mov ds, bx
    mov es, ax
    mov bx, 52
    xor ax, ax
    xor cx, cx
    
    mov al, ss:[bp+2]
    mul bx
    mov cl, ss:[bp+1]
    add ax, cx
    mul bx
    mov cl, ss:[bp+0]
    add ax, cx
    mov ds:mulc, ax
    mov di, sptr
    ; xchg ah, al
    mov es:[di], ax
    inc di
    inc di
    mov sptr, di 
    
    popa
    pop es
    pop ds
    loop d0
    
    ; sub sp, ax
    ; mov w. [bp-2], exseg1
    ; mov w. [bp-4], 0
    ; call far ptr [bp-4]
    ; add sp, ax
    
    xor ax, ax
    int 51
    mov ax, 1
    int 51
    hang:
    jmp hang
    
    add bp, ax
    mov sp, bp
    pop bp 
    
    retf
    
    subp1 proc
        dec al
        and al, 3fh
        test al, 20h
        jz c1
        sub al, 6 ; 32 - 6 = 26    
    c1:
        ret 
    subp1 endp   
ends

return segment
    mov ax, 4c00h
    int 21h
ends

;exseg1 segment
;    push ds
;    push es
;    mov ax, [bp-4]
;    mov ds, ax
;    mov es, ax
;    hlt 
;    pop es
;    pop ds
;    retf
;ends

end start ; set entry point and stop the assembler.
                     