package main
import "fmt"
import "github.com/olegsmetanin/gobazel/publicapi"
import "github.com/golang/protobuf/proto"

func main() {

	test := &publicapi.User{
		Value: *proto.Int64(678),
	}
	fmt.Printf("%+v\n", test)
}
