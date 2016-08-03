
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

org 100h

mov si, 81h
main_loop:
mov dl, [si]
cmp dl, 13
jz exit
mov ah, 2
int 21h
jmp main_loop
exit:
ret

; hex view:
; 00100h: db 0BEh
; 00101h: db 081h
; 00102h: db 000h
; 00103h: db 08Ah
; 00104h: db 014h
; 00105h: db 080h
; 00106h: db 0FAh
; 00107h: db 00Dh
; 00108h: db 074h "t"
; 00109h: db 006h
; 0010Ah: db 0B4h
; 0010Bh: db 002h
; 0010Ch: db 0CDh
; 0010Dh: db 021h "!"
; 0010Eh: db 0EBh
; 0010Fh: db 0F3h


