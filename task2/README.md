# How to

To start the program go to task1 folder and enter: 
>node my_ciphering_cli -c `config` -i `input file path` -o `output file path`

Where `-o` is `--output`, `-i` is `--input` and `-c` is `--config`. All can be interchanged 
and order doesn't matter. 

# Config 
There are 3 cipher types.   
- `C` is for Caesar cipher (with shift 1)  
- `A` is for Atbash cipher  
- `R` is for ROT-8 cipher   

The Caesar and ROT-8 have decoding and encoding flag, `0` and `1` respectively. 

Atbash doesn't have any flag and used only as it is.   
##### All config variants:
- `C0` is for Caesar decoding   
- `C1` is for Caesar encoding
- `R0` is for Rot-8 decoding   
- `R1` is for Rot-8 encoding
- `A` is for Atbash

# Input
The `path` to the input file with the message to be passed through encoding/decoding process should be declared. In case if not - the input is `process.stdin`

# Output
The `path` to the output file where the message passed through encoding/decoding process will be stored should be declared. In case if not - the output is `process.stdout`

# Examples
```c
C:\Users\user>node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```
> input.txt `This is secret. Message about "_" symbol!`

> output.txt `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`  

```c
C:\Users\user>node my_ciphering_cli --output "./output.txt" --input "./input.txt" --config "C1-C0-A-R1-R0-A-R0-R0-C1-A" 
```
> input.txt `This is secret. Message about "_" symbol!`

> output.txt `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`
```c
C:\Users\user>node my_ciphering_cli --config "A-A-C0-C1" 
```
> input.txt `This is secret. Message about "_" symbol!`

> output.txt `This is secret. Message about "_" symbol!`

