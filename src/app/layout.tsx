import "semantic-ui-css/semantic.min.css";

import { Grid } from "semantic-ui-react";
import type { Metadata } from "next";

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
            </body>
        </html>
    );
}
