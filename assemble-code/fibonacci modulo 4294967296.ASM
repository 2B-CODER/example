
; example of simplified Windows programming using complex macro features

include 'win32ax.inc' ; you can simply switch between win32ax, win32wx, win64ax and win64wx here

.code

  start:
	xor eax, eax
	xor ecx, ecx
	xor edx, edx
	inc edx
  next:
	mov esi, outh
	push eax
	mov eax, ecx
	call getuint
	pop eax
	mov word ptr esi, 203ah
	inc esi
	inc esi
	call getuint
	mov byte ptr esi, 0
	push eax ecx edx
	invoke	MessageBox,HWND_DESKTOP,outh,invoke GetCommandLine,MB_OK
	pop  edx ecx eax
	xadd eax, edx
	inc ecx
	jmp next
	invoke	ExitProcess,0
	jmp start

  getuint:
      test eax, eax
      jne print_ax_r
      mov byte ptr esi, 030h
      inc esi
      ret
  print_ax_r:
      push eax ebx edx
      ; findnonzero (proc)
	   mov edx, eax
	   mov eax, 1000000000 ; 10^9
	   mov ebx, 10
      div10L1:
	   push edx
	   cmp edx, eax
	   jae fnzend
	   xor edx, edx
	   div ebx ; eax /= 10
	   pop edx
	   jmp div10L1
      ; findnonzero (endp)
  fnzend:
      pop edx
      mov ebx, eax
      mov eax, edx
  pdigit:
      xor edx, edx
      div ebx
      add al, 30h
      mov byte ptr esi, al
      inc esi
      push edx
	   mov eax, ebx
	   xor edx, edx
	   mov ebx, 10
	   div ebx
	   mov ebx, eax
      pop edx
      mov eax, edx
      test ebx, ebx
      jnz pdigit
      ; mov byte ptr esi, 0
      pop edx ebx eax
      ret

.end start
.data
  outh db 64 dup(0)
  ; hextable db "0123456789ABCDEF"