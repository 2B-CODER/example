
; example of simplified Windows programming using complex macro features

include 'win32ax.inc' ; you can simply switch between win32ax, win32wx, win64ax and win64wx here

.code

  start:
	pushad
	mov ebp, esp
	mov esi, esp
	add esi, 32
	mov edi, outeax+12
	mov ecx, 8
	hexloop:
	    call gethexdw
	    add edi, 22
	loop hexloop
	mov esp, ebp
	popad
	invoke	MessageBox,HWND_DESKTOP,outeax,invoke GetCommandLine,MB_OK
	invoke	ExitProcess,0
	jmp start
  gethexdw:
     push ecx
     sub esi, 4
     mov ebx, hextable
     mov edx, [esi]
     mov ecx, 8
     gethex:
	dec edi
	mov eax, edx
	and al, 0Fh
	xlatb ; mov al, [ebx+al]
	mov [edi], al
	shr edx, 4
     loop gethex
     pop ecx
  ret

.end start
.data
  outeax db "EAX=", 8 dup(0), 13,10
  outecx db "ECX=", 8 dup(0), 13,10
  outedx db "EDX=", 8 dup(0), 13,10
  outebx db "EBX=", 8 dup(0), 13,10
  outesp db "ESP=", 8 dup(0), 13,10
  outebp db "EBP=", 8 dup(0), 13,10
  outesi db "ESI=", 8 dup(0), 13,10
  outedi db "EDI=", 8 dup(0), 13,10
  DB 0
  hextable db "0123456789ABCDEF"