import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type KYCVerificationScreenProps = {
    route: RouteProp<MainStackParamList, "KYCVerification">,
    navigation: FrameNavigationProp<MainStackParamList, "KYCVerification">,
};

export function KYCVerificationScreen({ navigation }: KYCVerificationScreenProps) {
    const [formData, setFormData] = React.useState({
        gstNumber: "",
        panNumber: "",
        aadhaarNumber: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: ""
    });

    const handleVerify = () => {
        // Add validation logic here
        navigation.navigate("ShopDetails");
    };

    return (
        <scrollView>
            <flexboxLayout style={styles.container}>
                <label className="text-2xl font-bold mb-6 text-indigo-600">
                    KYC Verification
                </label>

                <textField
                    hint="GST Number"
                    text={formData.gstNumber}
                    onTextChange={(args) => setFormData({...formData, gstNumber: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="PAN Card Number"
                    text={formData.panNumber}
                    onTextChange={(args) => setFormData({...formData, panNumber: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="Aadhaar Number"
                    text={formData.aadhaarNumber}
                    onTextChange={(args) => setFormData({...formData, aadhaarNumber: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <label className="text-xl font-semibold mb-4 text-gray-700">
                    Bank Account Details
                </label>

                <textField
                    hint="Account Number"
                    text={formData.accountNumber}
                    onTextChange={(args) => setFormData({...formData, accountNumber: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="IFSC Code"
                    text={formData.ifscCode}
                    onTextChange={(args) => setFormData({...formData, ifscCode: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="Bank Name"
                    text={formData.bankName}
                    onTextChange={(args) => setFormData({...formData, bankName: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <textField
                    hint="Branch Name"
                    text={formData.branchName}
                    onTextChange={(args) => setFormData({...formData, branchName: args.value})}
                    className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-4/5"
                />

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg w-4/5 mt-4"
                    onTap={handleVerify}
                >
                    Verify
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