import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ForgotPasswordScreenProps = {
    route: RouteProp<MainStackParamList, "ForgotPassword">,
    navigation: FrameNavigationProp<MainStackParamList, "ForgotPassword">,
};

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
    const [email, setEmail] = React.useState("");

    const handleResetPassword = () => {
        // Add password reset logic here
        navigation.navigate("Login");
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl font-bold mb-6 text-indigo-600">
                Reset Password
            </label>

            <textField
                hint="Email Address"
                text={email}
                onTextChange={(args) => setEmail(args.value)}
                className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
            />

            <button
                className="bg-indigo-600 text-white p-4 rounded-lg w-4/5 mb-4"
                onTap={handleResetPassword}
            >
                Reset Password
            </button>

            <button
                className="text-gray-600"
                onTap={() => navigation.navigate("Login")}
            >
                Back to Login
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