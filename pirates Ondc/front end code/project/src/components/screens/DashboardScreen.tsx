import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DashboardScreenProps = {
    route: RouteProp<MainStackParamList, "Dashboard">,
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const menuItems = [
        { title: "Orders", icon: "📦" },
        { title: "Inventory", icon: "📊" },
        { title: "Catalog", icon: "📱" },
        { title: "Payments", icon: "💰" }
    ];

    return (
        <flexboxLayout style={styles.container}>
            <flexboxLayout className="w-full p-4 bg-indigo-600">
                <label className="text-2xl font-bold text-white">Dashboard</label>
                <button
                    className="text-white ml-auto"
                    onTap={() => navigation.navigate("Login")}
                >
                    👤
                </button>
            </flexboxLayout>

            <gridLayout
                columns="*, *"
                rows="*, *"
                className="p-4 w-full"
            >
                {menuItems.map((item, index) => (
                    <flexboxLayout
                        key={index}
                        col={index % 2}
                        row={Math.floor(index / 2)}
                        className="bg-white m-2 p-6 rounded-xl shadow-md"
                        style={{ flexDirection: "column", alignItems: "center" }}
                    >
                        <label className="text-3xl mb-2">{item.icon}</label>
                        <label className="text-lg font-semibold text-gray-800">{item.title}</label>
                    </flexboxLayout>
                ))}
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
    }
});