
import { AdminSidebar, Bar, TableBody, Table, TableContainer, TableHeaders, TableHeading, EpinRow } from "../components";
import Select, { components } from "react-select";
import { CUSTOME_STYLES } from "../assets/data/constants";
import { IoMdKey, IoIosArrowForward } from "react-icons/io";
import { EpinHeaders, EpinData, EpinSortOptions } from "../assets/data/owner";
import { FaSort } from "react-icons/fa";

//  ?--- dropdown indicator

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<FaSort />
		</components.DropdownIndicator>
	);
};

function Epin() {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="epin">
				<Bar heading="Epin" />
				<div className="cardWidget">
					<CardWidget heading="Activate by E-pin" Icon={IoMdKey} Action={IoIosArrowForward} />
					<CardWidget heading="E-pin Details" Icon={IoMdKey} Action={IoIosArrowForward} />
					<CardWidget heading="E-pin Transfer" Icon={IoMdKey} Action={IoIosArrowForward} />
				</div>
				<TableContainer>
					<TableHeading>
						<p>E-Pin Transfer History</p>
						<Select
							defaultValue={EpinSortOptions[0]}
							options={EpinSortOptions}
							components={{ DropdownIndicator }}
							styles={CUSTOME_STYLES}
						/>
					</TableHeading>
					<Table>
						<TableHeaders
							style={{
								gridTemplateColumns: `repeat(${EpinHeaders.length},1fr)`,
							}}
							headers={EpinHeaders}
						/>
						<TableBody TableRow={EpinRow} data={EpinData} />
					</Table>
				</TableContainer>
			</main>
		</div>
	);
}

export default Epin;

export const CardWidget = ({ heading, Icon, Action, value }) => {
	return (
		<article className="pinCard">
			<Icon />
			<div>
				<h3>{heading}</h3>
				{value && <p>{value}</p>}
			</div>
			<Action />
		</article>
	);
};
