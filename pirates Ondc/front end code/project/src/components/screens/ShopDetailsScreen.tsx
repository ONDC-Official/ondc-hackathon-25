import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ImageSource } from '@nativescript/core';

type ShopDetailsScreenProps = {
    route: RouteProp<MainStackParamList, "ShopDetails">,
    navigation: FrameNavigationProp<MainStackParamList, "ShopDetails">,
};

export function ShopDetailsScreen({ navigation }: ShopDetailsScreenProps) {
    const [shopCount, setShopCount] = React.useState(1);
    const [shops, setShops] = React.useState([{
        name: "",
        address: "",
        licenseNumber: "",
        photo: null as ImageSource | null
    }]);

    const handleRegister = () => {
        // Add validation logic here
        navigation.navigate("Dashboard");
    };

    return (
        <scrollView>
            <flexboxLayout style={styles.container}>
                <label className="text-2xl font-bold mb-6 text-indigo-600">
                    Shop Details
                </label>

                <flexboxLayout className="mb-4 w-4/5">
                    <label className="text-gray-700 mb-2">Number of Shops:</label>
                    <slider
                        value={shopCount}
                        minValue={1}
                        maxValue={5}
                        onValueChange={(args) => {
                            const newCount = Math.round(args.value);
                            setShopCount(newCount);
                            setShops(Array(newCount).fill({
                                name: "",
                                address: "",
                                licenseNumber: "",
                                photo: null
                            }));
                        }}
                    />
                    <label className="text-gray-700">{shopCount}</label>
                </flexboxLayout>

                {shops.map((shop, index) => (
                    <flexboxLayout key={index} className="w-4/5 mb-6 p-4 border-2 border-gray-200 rounded-lg">
                        <label className="text-xl font-semibold mb-4">Shop {index + 1}</label>
                        
                        <textField
                            hint="Shop Name"
                            text={shop.name}
                            onTextChange={(args) => {
                                const newShops = [...shops];
                                newShops[index].name = args.value;
                                setShops(newShops);
                            }}
                            className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-full"
                        />

                        <textField
                            hint="Shop Address"
                            text={shop.address}
                            onTextChange={(args) => {
                                const newShops = [...shops];
                                newShops[index].address = args.value;
                                setShops(newShops);
                            }}
                            className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-full"
                        />

                        <textField
                            hint="License Number"
                            text={shop.licenseNumber}
                            onTextChange={(args) => {
                                const newShops = [...shops];
                                newShops[index].licenseNumber = args.value;
                                setShops(newShops);
                            }}
                            className="input p-4 mb-4 rounded-lg border-2 border-gray-300 w-full"
                        />

                        <button
                            className="bg-gray-200 p-4 rounded-lg w-full mb-4"
                            onTap={() => {
                                // Add image picker logic
                            }}
                        >
                            Upload Shop Photo
                        </button>
                    </flexboxLayout>
                ))}

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg w-4/5 mt-4"
                    onTap={handleRegister}
                >
                    Register
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