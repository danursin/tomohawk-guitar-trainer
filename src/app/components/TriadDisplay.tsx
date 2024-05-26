import { Statistic, Table } from "semantic-ui-react";
import { StringSet, TriadInversion, TriadName, TriadQuality } from "../services/OptionService";

import React from "react";

interface TriadDisplayProps {
    triadName: TriadName;
    triadQuality: TriadQuality;
    triadInversion: TriadInversion;
    stringSet: StringSet;
}

const TriadDisplay: React.FC<TriadDisplayProps> = ({ triadName, triadQuality, triadInversion, stringSet }) => {
    return (
        <Statistic>
            <Statistic.Label>Current Selection</Statistic.Label>
            <Statistic.Value>
                <Table compact celled stackable>
                    <Table.Row warning>
                        <Table.Cell content={triadName} />
                        <Table.Cell content={triadQuality} />
                        <Table.Cell content={triadInversion} />
                        <Table.Cell content={stringSet} />
                    </Table.Row>
                </Table>
            </Statistic.Value>
        </Statistic>
    );
};

export default TriadDisplay;
