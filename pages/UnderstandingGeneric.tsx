import { Container } from "../src/components/Container";

interface IHello<T, K> {
    hellos: T[];

    filterBy?: K;

    getLabel: (option: T) => string;
    getValue: (option: T) => T[keyof T];
}

const Hello = <T extends object, K extends keyof T>(props: IHello<T, K>) => {
    return (
        <div>
            {props.hellos.map(hello => (
                <div key={"" + props.getValue(hello)}>{props.getLabel(hello)}</div>
            ))}
        </div>
    );
};

const UnderstandingGeneric = () => {
    return (
        <Container>
            <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
                Understanding Generic
            </h1>
            <Hello
                hellos={[
                    { id: "mior", age: 28, green: 2 },
                    { id: "saiful", age: 50, green: 2 },
                    { id: "farid", age: 60, green: 2 }
                ]}
                getLabel={option => option.id}
                getValue={option => option.age}
            />
        </Container>
    );
};

export default UnderstandingGeneric;