Info
====

* convert p12 to pem

        openssl pkcs12 -in path.p12 -out crt.pem -clcerts -nokeys
        openssl pkcs12 -in path.p12 -out key.pem -nocerts -nodes

* install `apn`

        npm install apn
