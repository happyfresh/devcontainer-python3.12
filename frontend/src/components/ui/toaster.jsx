import { Toaster as HotToaster } from "react-hot-toast"

const Toaster = () => {
    return (
        <HotToaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                // Default options for specific types
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                },
                error: {
                    duration: 4000,
                    iconTheme: {
                        primary: 'red',
                        secondary: 'white',
                    },
                },
            }}
        />
    )
}

export { Toaster }
