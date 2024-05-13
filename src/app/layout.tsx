import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Grid } from "semantic-ui-react";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "Tomohawk Guitar Trainer",
    description: "Tomohawk Guitar Trainer"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <h1>Tomohawk Guitar Trainer</h1>
                </nav>
                <main>
                    <Grid padded>
                        <Grid.Column>{children}</Grid.Column>
                    </Grid>
                </main>
                <ToastContainer />
            </body>
        </html>
    );
}
