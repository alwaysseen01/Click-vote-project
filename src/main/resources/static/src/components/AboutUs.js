import React, { useEffect } from 'react'
import "../css/aboutUs.css"

const AboutUs = () => {
    useEffect(() => {
        document.body.style.overflowY = 'auto';
      
        
        return () => {
            document.body.style.overflowY = 'hidden';
        };
    }, []);

    return (
        <div className='aboutUsPageBox'>
            <h1 className='questionTitleLeft'>What is our platform?</h1>
            <p className='questionTextLeft'>
                An online voting system is a software platform that allows groups to securely conduct polls and elections. With such a system, you can collect the opinions of your participants, analyze the results and make important decisions. An online voting system can be useful for different types of organizations and events, for example:
                Election of leaders, partners or employees
                Voting on rules, regulations or nominations
                Surveys among employees, clients or partners
                Agreeing on the schedule, location or topic of meetings
            </p>
            <h1 className='questionTitleRight'>What do we offer?</h1>
            <p className='questionTextRight'>
                Our platform offers you a simple and convenient way to create and conduct online voting. All you need is:
                Register on our website and create your account
                Ask a question or poll topic and add answer options
                Invite participants via email or link
                Track voting progress and get results in real time
            </p>
            <h1 className='questionTitleLeft'>Where you can find us?</h1>
            <table className='adressesTable'>
                <tr>
                    <th>№</th>
                    <th>Адрес</th>
                    <th>Название филиала</th>
                    <th>Цель филиала</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>ул. Абая, 45</td>
                    <td>Алматы-Центр</td>
                    <td>Главный офис, администрация, бухгалтерия</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>пр. Сейфуллина, 123</td>
                    <td>Алматы-Восток</td>
                    <td>Техническое обслуживание, ремонт, запчасти</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>ул. Жандосова, 12</td>
                    <td>Алматы-Запад</td>
                    <td>Пресс-центр, маркетинг, реклама</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>ул. Толе би, 78</td>
                    <td>Алматы-Юг</td>
                    <td>Обучение, консультация, поддержка</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>ул. Рыскулова, 34</td>
                    <td>Алматы-Север</td>
                    <td>Исследование, разработка, инновация</td>
                </tr>
            </table>
        </div>
    )
}

export default AboutUs