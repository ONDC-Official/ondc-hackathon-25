import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { DatePicker } from '@nativescript/core';

type SellerRegistrationScreenProps = {
    route: RouteProp<MainStackParamList, "SellerRegistration">,
    navigation: FrameNavigationProp<MainStackParamList, "SellerRegistration">,
};

export function SellerRegistrationScreen({ navigation }: SellerRegistrationScreenProps) {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        dob: new Date(),
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleNext = () => {
        // Add validation logic here
        navigation.navigate("KYCVerification");
    };

    return (
        <scrollView>
            <flexboxLayout style={styles.container}>
                <button
                    className="text-indigo-600 self-end mb-4"
                    onTap={() => navigation.navigate("Login")}
                >
                    Already have an account? Login
                </button>

                <label className="text-2xl font-bold mb-6 text-indigo-600">
                    Seller Registration
                </label>

                <textField
                    hint="First Name"
                    text={formData.firstName}
                    onTextChange={(args) => setFormData({...formData, firstName: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="Last Name"
                    text={formData.lastName}
                    onTextChange={(args) => setFormData({...formData, lastName: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <datePicker
                    date={formData.dob}
                    onDateChange={(args) => setFormData({...formData, dob: args.value})}
                    className="mb-4 w-4/5"
                />

                {/* Add remaining form fields */}

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg w-4/5 mt-4"
                    onTap={handleNext}
                >
                    Next →
                </button>
            </flexboxLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
    }
});