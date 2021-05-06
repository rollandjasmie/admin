import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";

const Chargement = () => (
    <Section>
        {list.map(l => (
            <Article key={l.prop}>
                <p> 𝑉𝑒𝑢𝑖𝑙𝑙𝑒𝑧 𝑝𝑎𝑡𝑖𝑒𝑛𝑡𝑒𝑟 </p>
                <ReactLoading type={l.prop} color="orange" />
            </Article>
        ))}
    </Section>
);

export default Chargement;