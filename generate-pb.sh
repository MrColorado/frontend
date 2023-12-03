cd src/grpc

PROTO_DIR=.

# protoc \
#     --js_out=import_style=commonjs,binary:. \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. novel.proto

#  -I=./proto ./proto/*.proto \

# PROTO_DIR=./client/proto

# protoc \
#     --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DIR} novel.proto
protoc \
  --js_out=import_style=commonjs:${PROTO_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${PROTO_DIR} novel.proto