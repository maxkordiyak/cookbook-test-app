import React from "react";
import { mount } from "enzyme";
import List from "./index";
import { Link } from 'react-router-dom';

describe("List", () => {
    let props;
    let mountedList;
    const list = () => {
        if (!mountedList) {
            mountedList = mount(
                <List {...props} />
            );
        }
        return mountedList;
    }

    beforeEach(() => {
        props = {
            list: undefined
        };
        mountedList = undefined;
    });

    it("always renders a div", () => {
        const divs = list().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("when `list` is passed", () => {
        beforeEach(() => {
            props.list = [];
        });

        it("renders an `ul`", () => {
            expect(list().find("ul").length).toBe(1);
        });

        it("passes `list` to the rendered `ul` as `children`", () => {
            const ul = list().find("ul");
            expect(ul.props().children).toEqual(props.list);
        });
    });

    describe("when `list` is undefined", () => {
        beforeEach(() => {
            props.list = undefined;
        });

        it("does not render a `Link`", () => {
            expect(list().find(Link).length).toBe(0);
        });
    });

});
