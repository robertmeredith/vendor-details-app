          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 ">
                {/* CLIENT NAME */}
                <CustomFormikInput
                  name="client"
                  labelText="Your name"
                  type="text"
                  id="client"
                />
                {/* PARTNER NAME */}
                <CustomFormikInput
                  name="partner"
                  labelText="Partner's name"
                  type="text"
                  id="partner"
                />
                {/* EVENT DATE */}
                {/* <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={date}
                  startWeekOn="mon"
                  onChange={(newValue) => setDate(newValue)}
                /> */}
                {/* PLACEHOLDER */}
                <CustomFormikInput
                  name="placeholder"
                  labelText="Placeholder"
                  type="text"
                  id="placeholder"
                />
              </div>