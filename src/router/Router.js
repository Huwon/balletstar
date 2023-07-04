import React, { useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack'
import {WebViewPage } from '../page'

const Stack = createStackNavigator()

const Router = (props) => {
    const forFade = ({ current }) => ({
        cardStyle: { opacity: current.progress },
    })
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }}
          initialRouteName={'WebViewPage'}
            >


                {/* WebView 화면 */}
                <Stack.Screen
                  name="WebViewPage"
                  component={WebViewPage}
                  headerShown={false}
                  options={{
                    headerShown: false,
                    cardStyleInterpolator: forFade,
                    gestureDirection: 'horizontal',
                  }}
                />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
Router.defatulProps = {
    userInfo: null,
}
