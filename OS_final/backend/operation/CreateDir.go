package main

import "fmt"
import "os"

func main(){
	var directoryPath string = os.Args[1]

	if directoryPath == "-h" || directoryPath == "--help" {
		fmt.Println("Usage: mkdir directory")
		return
	}

	pathErr := os.MkdirAll(directoryPath,0755)

	if pathErr != nil {
		fmt.Println(pathErr)
	}
}