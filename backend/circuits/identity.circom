// circuits/identity.circom
pragma circom 2.0.0;

template Identity() {
    signal input secret;
    signal output out;

    out <== secret * secret; // Example constraint
}

component main = Identity();
