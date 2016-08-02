ORG 100h

LEA SI, a1
MOV CX, a1_l
MOV AH, 0Eh

m: lodsb
INT 10h
LOOP m

RET

a1 DB 'hello world'
a1_l = $ - offset a1
