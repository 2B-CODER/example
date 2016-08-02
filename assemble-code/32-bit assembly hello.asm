push 0
call dw. GetCommandLineA
push eax
call code_101B
ASCII "Hello, World!"
code 101B:
push 0
call MessageBox
push 0
call ExitProcess
