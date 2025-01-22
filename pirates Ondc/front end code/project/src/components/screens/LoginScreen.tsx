import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { TextField, FlexboxLayout, Button, Label } from '@nativescript/core';

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        // Add validation logic here
        navigation.navigate("Dashboard");
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-3xl font-bold mb-8 text-indigo-600">
                Seller Login
            </label>

            <textField
                hint="Email/Phone"
                text={email}
                onTextChange={(args) => setEmail(args.value)}
                className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
            />

            <textField
                hint="Password"
                text={password}
                secure={true}
                onTextChange={(args) => setPassword(args.value)}
                className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
            />

            <button
                className="bg-indigo-600 text-white p-4 rounded-lg w-4/5 mb-4"
                onTap={handleLogin}
            >
                Login
            </button>

            <button
                className="text-indigo-600 mb-4"
                onTap={() => navigation.navigate("ForgotPassword")}
            >
                Forgot Password?
            </button>

            <button
                className="text-gray-600"
                onTap={() => navigation.navigate("SellerRegistration")}
            >
                New Seller? Register Here
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
    }
});