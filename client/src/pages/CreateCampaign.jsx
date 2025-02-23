import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";

import { money } from "../assets";
import { CustomButton } from "../components";
import { checkIfImage } from "../utils";
import { FormField } from "../components";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
    });

    const handleFormFieldChange = (fieldName, event) => {
        setForm({
            ...form,
            [fieldName]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //checking if the passed image url is correct or not
        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true);
                console.log("Target Value: ", form.target);
                const amt = ethers.utils.parseUnits(form.target, 18);
                console.log("Wei: ", amt);
                await createCampaign({
                    ...form,  
                    // target: ethers.utils.parseUnits(form.target, 18), //18 decimals to display wei (1ETH = 10^18 Wei )
                    target: amt
                });
                setIsLoading(false);
                navigate("/");
            } else {
                alert("Provide a valid image URL");
                setForm({
                    ...form,
                    image: "",
                });
            }
        });

        console.log(form);
    };

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm: p-10 p-4 ">
            {isLoading && "Loader..."}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
                    Start A Campaign
                </h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full mt-[65px] flex flex-col gap-[30px] "
            >
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        LabelName="Your Name *"
                        placeholder="Write your name"
                        inputType="text"
                        value={form.name}
                        handleChange={(event) => {
                            handleFormFieldChange("name", event);
                        }}
                    />
                    <FormField
                        LabelName="Campaign Title *"
                        placeholder="Give your campaign a title"
                        inputType="text"
                        value={form.title}
                        handleChange={(event) => {
                            handleFormFieldChange("title", event);
                        }}
                    />
                </div>

                <FormField
                    LabelName="Story *"
                    placeholder="Tell your story about the campaign"
                    isTextArea
                    value={form.description}
                    handleChange={(event) => {
                        handleFormFieldChange("description", event);
                    }}
                />

                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] ">
                    <img
                        src={money}
                        alt="money"
                        className="w-[40px] h-[40px] object-contain "
                    />
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px] ">
                        You will get 100% of the raised amount
                    </h4>
                </div>

                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        LabelName="Goal *"
                        placeholder="ETH 0.50"
                        inputType="text"
                        value={form.target}
                        handleChange={(event) => {
                            handleFormFieldChange("target", event);
                        }}
                    />
                    <FormField
                        LabelName="End Date *"
                        placeholder="End Date"
                        inputType="date"
                        value={form.deadline}
                        handleChange={(event) => {
                            handleFormFieldChange("deadline", event);
                        }}
                    />
                </div>

                <FormField
                    LabelName="Campaign Image *"
                    placeholder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    handleChange={(event) => {
                        handleFormFieldChange("image", event);
                    }}
                />

                <div className="flex justify-center items-center mt-[40px]  ">
                    <CustomButton
                        btnType="submit"
                        title="Submit new campaign"
                        styles="bg-[#1dc071] "
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateCampaign;
