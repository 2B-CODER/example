
; example of simplified Windows programming using complex macro features

include 'win32ax.inc' ; you can simply switch between win32ax, win32wx, win64ax and win64wx here

.code

  start:
        xor ecx, ecx
        mov eax, ebp
        mov edi, outh
  br0:
        call geteax
        push eax ecx
        invoke  MessageBox,HWND_DESKTOP,outh,invoke GetCommandLine,MB_OK
        pop  ecx eax
        cmp eax, 0
        jz br1
        mov eax, [eax]
        inc ecx
        jmp br0
  br1:
        mov eax, ecx
        call getuint
        invoke  MessageBox,HWND_DESKTOP,outh,invoke GetCommandLine,MB_OK
        invoke  ExitProcess,0
        jmp start
  geteax:
     pusha
     mov ebp, esp
     sub esi, 4
     mov ebx, hextable
     mov edx, eax
     mov ecx, 8
     add edi, ecx
     gethex:
        dec edi
        mov eax, edx
        and al, 0Fh
        xlatb ; mov al, [ebx+al]
        mov [edi], al
        shr edx, 4
     loop gethex
     mov esp, ebp
     popa
  ret
  getuint:
      mov esi, outh
      test eax, eax
      jne print_ax_r
      mov word ptr esi, 00030h
      ret
  print_ax_r:
      pusha
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
      mov byte ptr esi, 0
      popa
      ret

.end start
.data
  outh db 32 dup(0)
  hextable db "0123456789ABCDEF"    
