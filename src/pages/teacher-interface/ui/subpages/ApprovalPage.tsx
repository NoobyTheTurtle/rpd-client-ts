import {FC} from "react"

export const ApprovalPage: FC = () => {
    return (
        <div>
            <h2>Лист согалсования</h2>
            <div className="template">
                Автор программы:
            </div>
            <div className="add-manager">
                Беднякова Т.М. <br/>
                <span>ФИО преподавателя, задает РОП</span> <br/>
                ____________________ (подпись) <br/>
                <span>указываются РОП</span>
            </div>
            <div className="tamplate">
                Рабочая программа разработана в соответствии с требованиями ФГОС ВО по направлению подготовки высшего
                образования
                09.03.01 Информатика и вычислительная техника <br/>
                <span>направление указывает РОП</span> <br/>
            </div>
            <div className="tamplate">
                Программа рассмотрена на заседании кафедры распределенных информационных вычислительных систем <br/>
                <span>кафедра загружается из 1С</span> <br/>
            </div>
            <div className="tamplate">
                Протокол заседания: №23 от «09» июня 2023 г <br/>
                <span>указывает РОП при формировании шаблонов РПД</span> <br/>
            </div>
            <div className="tamplate">
                Заведующий кафедрой
            </div>
            <div>
                ___________________д. т. н. профессор Кореньков В.В.<br/>
                <span>Где брать заведующего кафедрой?</span>
            </div>

            <div>
                <div className="tamplate">
                    СОГЛАСОВАНО
                </div>
                <div>
                    Заведующий кафедрой САУ
                    ___________________д. т. н. профессор Черемисина Е.Н. <br/>
                    <span>Где брать заведующего кафедрой?</span>
                </div>
            </div>
            <div className="tamplate">
                Эксперт: <br/>
                Марков Кирилл Николаевич кандидат технических наук заведующий отделом
                Федерального государственного бюджетного учреждения «Всероссийский научноисследовательский геологический
                нефтяной институт» <br/>
                <span>Кто указывает эксперта?</span>
            </div>
        </div>
    )
}