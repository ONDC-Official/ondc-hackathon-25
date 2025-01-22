import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { LoginScreen } from "./screens/LoginScreen";
import { SellerRegistrationScreen } from "./screens/SellerRegistrationScreen";
import { KYCVerificationScreen } from "./screens/KYCVerificationScreen";
import { ShopDetailsScreen } from "./screens/ShopDetailsScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#4F46E5",
                },
                headerTintColor: "#ffffff",
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login" }}
            />
            <StackNavigator.Screen
                name="SellerRegistration"
                component={SellerRegistrationScreen}
                options={{ title: "Seller Registration" }}
            />
            <StackNavigator.Screen
                name="KYCVerification"
                component={KYCVerificationScreen}
                options={{ title: "KYC Verification" }}
            />
            <StackNavigator.Screen
                name="ShopDetails"
                component={ShopDetailsScreen}
                options={{ title: "Shop Details" }}
            />
            <StackNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: "Dashboard" }}
            />
            <StackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ title: "Forgot Password" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);